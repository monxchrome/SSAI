"use client";

import * as z from "zod"
import {Heading} from "@/components/heading";
import {BringToFront, Code, MessageSquarePlus} from "lucide-react";
import {useForm} from "react-hook-form";

import {formSchema} from "./constants"
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {ChatCompletionRequestMessage} from "openai";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import {cn} from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";

const CodePage = () => {
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/code", {
                messages: newMessages
            });

            setMessages((current) => [...current, userMessage, response.data])

            form.reset();
        } catch (e) {
            console.log(e);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Code Generation"
                description="Start coding with SSAI"
                icon={Code}
                iconColor="text-purple-700"
                bgColor="bg-purple-700/10" />
            <div className="px-4 lg:px-8 ">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid
                            grid-cols-12 gap-2">
                            <FormField render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0
                                            focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Animated background using CSS/JS"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )} name="prompt" />
                            <Button className="col-span-12 lg:col-span-2 bg-gray-200 text-black hover:text-white">
                                Send <BringToFront className="ml-2" />
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-black">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty label="We are waiting for your questions :)" />
                        </div>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map(message => (
                            <div key={message.content} className={cn(
                                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                message.role === "user" ? "bg-white border border-black/10": "bg-black text-white"
                            )}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown
                                    components={{
                                        pre: ({node, ...props}) => (
                                            <div className="overflow-auto w-full my-2 bg-white/10 p-2 rounded-lg">
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({node, ...props}) => (
                                            <code className="bg-white/10 rounded-lg p-1" {...props} />
                                        )
                                    }}
                                    className="text-sm overflow-hidden leading-7"
                                >
                                    {message.content || ""}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodePage;
