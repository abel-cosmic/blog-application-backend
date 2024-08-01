// blogController.ts
import { Request, Response } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../../services/blog";

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

export const createBlogController = async (req: Request, res: Response) => {
  try {
    const { title, description, content, link, location, date, authorId } =
      req.body;
    const image = req.file?.path || ""; // Use the uploaded image path
    const blog = await createBlog({
      title,
      description,
      content,
      image,
      link,
      location,
      date,
      authorId: Number(authorId),
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const updateBlogController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { title, description, content, link, location, date } = req.body;
    const image = req.file?.path || ""; // Use the uploaded image path if available
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
