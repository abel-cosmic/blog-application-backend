import { Request, Response } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../../services/blog";
import { CustomRequest } from "../../types/middleware";
import path from "path";

export const getAllBlogsController = async (req: Request, res: Response) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await getBlogById(Number(id));
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const createBlogController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { title, description, content, link, location, date } = req.body;
    let image = "";
    if (req.file) {
      const relativePath = path.join("uploads", "images", req.file.filename);
      image = relativePath.split(path.sep).join("/");
    }

    if (!title || !description || !content || !link || !location || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const authorId = req.user?.id;

    const blog = await createBlog({
      title,
      description,
      content,
      image: process.env.EXPRESS_URL + image,
      link,
      location,
      date,
      authorId,
    });
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const updateBlogController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { title, description, content, link, location, date } = req.body;
    const image = req.file?.path || "";
    const blog = await updateBlog(Number(id), {
      title,
      description,
      content,
      image,
      link,
      location,
      date,
    });
    res.json(blog);
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);
    res.status(500).json({ error: "Failed to update blog" });
  }
};

export const deleteBlogController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteBlog(Number(id));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
