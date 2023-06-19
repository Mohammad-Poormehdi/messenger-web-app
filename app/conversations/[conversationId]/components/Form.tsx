"use client";

import useConversations from "@/app/hooks/useConversations";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton } from "next-cloudinary";

function Form() {
  const { conversationsId } = useConversations();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { message: "" },
  });

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      Image: result?.info?.secure_url,
      conversationsId,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", { ...data, conversationsId });
    console.log(data);
  };

  return (
    <div className="px-4 py-4  bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="udhtzm2w"
      >
        <HiPhoto size={30} className="text-sky-500 cursor-pointer" />
      </CldUploadButton>
      <form
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MessageInput
          id={"message"}
          {...register("message", { required: true })}
          placeholder="Write a message"
        />
        <button
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
          type="submit"
        >
          <HiPaperAirplane size={18} className="text-white rotate-90" />
        </button>
      </form>
    </div>
  );
}

export default Form;
