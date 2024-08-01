// src/services/blog/index.ts
import { Blog } from "@prisma/client";
import prisma from "../../config/prisma";
import AppError from "../../utils/error/app-error";

export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    return await prisma.blog.findMany();
  } catch (error) {
    throw new AppError("Error retrieving blogs", 500);
  }
};

export const getBlogById = async (id: number): Promise<Blog | null> => {
  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      throw new AppError("Blog not found", 404);
    }
    return blog;
  } catch (error) {
    throw new AppError("Error retrieving blog", 500);
  }
};

export const createBlog = async (
  data: Omit<Blog, "id" | "createdAt" | "updatedAt">
): Promise<Blog> => {
  try {
    return await prisma.blog.create({
      data,
    });
  } catch (error) {
    throw new AppError("Error creating blog", 500);
  }
};

export const updateBlog = async (
  id: number,
  data: Partial<Blog>
): Promise<Blog> => {
  try {
    return await prisma.blog.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new AppError("Error updating blog", 500);
  }
};

export const deleteBlog = async (id: number): Promise<Blog> => {
  try {
    return await prisma.blog.delete({
      where: { id },
    });
  } catch (error) {
    throw new AppError("Error deleting blog", 500);
  }
};
