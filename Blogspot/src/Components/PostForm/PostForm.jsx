import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import RTE from "../RTE";
import dbService from "../../Appwrite/Configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Select from "../Select";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    console.log("this is user data", userData);
  });
  // const submit = async (data) => {
  //   if (post) {
  //     const file =
  //       data.image && data.image[0]
  //         ? await dbService.uploadFile(data.image[0])
  //         : null;
  //         if (file) {
  //           dbService.deletefile(post.featuredImage);
  //         }
  //         const newpost = await dbService.updatePost(post.$id, {
  //           ...data,
  //           featuredImage: file ? file.$id : undefined,
  //         });

  //         console.log("This is file ",file);
  //     if (newpost) {
  //       navigate(`/Post/${newpost.$id}`);
  //     }
  //   } else {
  //     const file =
  //       data.image && data.image[0]
  //         ? await dbService.uploadFile(data.image[0])
  //         : null;
  //     if (file) {
  //       const file_id = file.$id;
  //       data.featuredImage = file_id;
  //       const newPost = await dbService.createPost({
  //         ...data,
  //         userid: userData.$id,
  //       });

  //       if (newPost) {
  //         navigate(`/Post/${newPost.$id}`);
  //       }
  //     } else {
  //     }
  //   }
  // };

  const submit = async (data) => {
    console.log("hello this is data",data);
    if (post) {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;

      if (file) {
        dbService.deleteFile(post.featuredImage);
      }

      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await dbService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await dbService.createPost({
          ...data,
          userid: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]+/g, "");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="postform p-4 w-full md:flex md:flex-row flex-col  gap-4"
    >
      <div className="left w-2/3">
        <div className="title-slug flex flex-col gap-4">
          <TextField
            label="title"
            type="text"
            className="w-full md:w-2/3"
            {...register("title", {
              required: true,
            })}
          />{" "}
          <input
            type="text"
            placeholder="Slug"
            className="w-full slug md:w-2/3 p-3 rounded-md  border-sky-500"
            {...register("slug", {
              required: true,
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />{" "}
        </div>
        <RTE
          name="Realcontent"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="right w-1/3">
        <label htmlFor="featuredImage">Featured Image : </label>
        <input
          type="file"
          placeholder="featuredImage"
          accept="image/png image/jpeg image/gif image/jpg"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={dbService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <select
          options={["active", "inactive"]}
          className="mb-4"
          {...register("status", { required: true })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 hover:rounded-full p-3 rounded-lg text-white font-semibold"
        >
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
