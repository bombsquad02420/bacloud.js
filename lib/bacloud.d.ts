import { z } from 'zod';

declare const API_VERSION = 7;
declare const RequestSchema: z.ZodObject<{
    /**
     * command
     *
     * the command to execute on the server.
     */
    c: z.ZodString;
    /**
     * token
     *
     * login token
     */
    t: z.ZodNullable<z.ZodString>;
    /**
     * payload
     *
     * the parameters used by the command
     */
    p: z.ZodRecord<z.ZodString, z.ZodAny>;
    /**
     * tzoffset
     *
     * the offset between utc and local time in seconds.
     */
    z: z.ZodNumber;
    /**
     * isatty
     *
     * is the client using an interactive command line.
     */
    y: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    c: string;
    t: string | null;
    p: Record<string, any>;
    z: number;
    y: boolean;
}, {
    c: string;
    t: string | null;
    p: Record<string, any>;
    z: number;
    y: boolean;
}>;
declare const ResponseSchema: z.ZodObject<{
    /**
     * If present, client should print this message before any other response
     * processing (including error handling) occurs.
     * */
    message: z.ZodNullable<z.ZodString>;
    /**
     * end arg for message print() call.
     */
    message_end: z.ZodString;
    /**
     * If present, client should abort with this error message.
     */
    error: z.ZodNullable<z.ZodString>;
    /**
     * How long to wait before proceeding with remaining
     * response (can be useful when waiting for server progress in a loop).
     */
    delay_seconds: z.ZodNumber;
    /**
     * If present, a token that should be stored client-side and passed
     * with subsequent commands.
     */
    login: z.ZodNullable<z.ZodString>;
    /**
     * If True, any existing client-side token should be discarded.
     */
    logout: z.ZodBoolean;
    /**
     * If present, client should generate a manifest of this dir.
     * It should be added to end_command args as 'manifest'.
     */
    dir_manifest: z.ZodNullable<z.ZodString>;
    /**
     * If present, client should upload the requested files (arg1)
     * individually to a server command (arg2) with provided args (arg3).
     */
    uploads: z.ZodAny;
    /**
     * If present, a list of pathnames that should be base64
     * gzipped and uploaded to an 'uploads_inline' dict in end_command args.
     * This should be limited to relatively small files.
     */
    uploads_inline: z.ZodAny;
    /**
     * If present, file paths that should be deleted on the client.
     */
    deletes: z.ZodAny;
    /**
     * If present, pathnames mapped to base64 gzipped data to
     * be written to the client. This should only be used for relatively
     * small files as they are all included inline as part of the response.
     */
    downloads_inline: z.ZodAny;
    /**
     * If present, all empty dirs under this one should be
     * removed.
     */
    dir_prune_empty: z.ZodNullable<z.ZodString>;
    /**
     * If present, url to display to the user.
     */
    open_url: z.ZodNullable<z.ZodString>;
    /**
     * If present, a line of input is read and placed into
     * end_command args as 'input'. The first value is the prompt printed
     * before reading and the second is whether it should be read as a
     * password (without echoing to the terminal).
     */
    input_prompt: z.ZodAny;
    /**
     * If present, a message that should be printed after all other
     * response processing is done.
     */
    end_message: z.ZodNullable<z.ZodString>;
    /**
     * end arg for end_message print() call.
     */
    end_message_end: z.ZodString;
    /**
     * If present, this command is run with these args at the end
     * of response processing.
     */
    end_command: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    uploads?: any;
    uploads_inline?: any;
    deletes?: any;
    downloads_inline?: any;
    input_prompt?: any;
    end_command?: any;
    error: string | null;
    message: string | null;
    message_end: string;
    delay_seconds: number;
    login: string | null;
    logout: boolean;
    dir_manifest: string | null;
    dir_prune_empty: string | null;
    open_url: string | null;
    end_message: string | null;
    end_message_end: string;
}, {
    uploads?: any;
    uploads_inline?: any;
    deletes?: any;
    downloads_inline?: any;
    input_prompt?: any;
    end_command?: any;
    error: string | null;
    message: string | null;
    message_end: string;
    delay_seconds: number;
    login: string | null;
    logout: boolean;
    dir_manifest: string | null;
    dir_prune_empty: string | null;
    open_url: string | null;
    end_message: string | null;
    end_message_end: string;
}>;
declare type RequestSchemaType = z.infer<typeof RequestSchema>;
declare type ResponseSchemaType = z.infer<typeof ResponseSchema>;

declare const _default: "Hello World!";

export { API_VERSION, RequestSchema, RequestSchemaType, ResponseSchema, ResponseSchemaType, _default as default };
