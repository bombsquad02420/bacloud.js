import fetch from 'isomorphic-unfetch';
import { z } from 'zod';

const API_VERSION = 7;
z.object({
    /**
     * command
     *
     * the command to execute on the server.
     */
    c: z.string(),
    /**
     * token
     *
     * login token
     */
    t: z.string().nullable(),
    /**
     * payload
     *
     * the parameters used by the command
     */
    p: z.record(z.unknown()),
    /**
     * tzoffset
     *
     * the offset between utc and local time in seconds.
     */
    z: z.number(),
    /**
     * isatty
     *
     * is the client using an interactive command line.
     */
    y: z.boolean(),
});
const ResponseSchema = z.object({
    /**
     * If present, client should print this message before any other response
     * processing (including error handling) occurs.
     * */
    message: z.string().nullable(),
    /**
     * end arg for message print() call.
     */
    message_end: z.string(),
    /**
     * If present, client should abort with this error message.
     */
    error: z.string().nullable(),
    /**
     * How long to wait before proceeding with remaining
     * response (can be useful when waiting for server progress in a loop).
     */
    delay_seconds: z.number(),
    /**
     * If present, a token that should be stored client-side and passed
     * with subsequent commands.
     */
    login: z.string().nullable(),
    /**
     * If True, any existing client-side token should be discarded.
     */
    logout: z.boolean(),
    /**
     * If present, client should generate a manifest of this dir.
     * It should be added to end_command args as 'manifest'.
     */
    dir_manifest: z.string().nullable(),
    /**
     * If present, client should upload the requested files (arg1)
     * individually to a server command (arg2) with provided args (arg3).
     */
    uploads: z.tuple([z.string().array(), z.string(), z.record(z.string())]).nullable(),
    /**
     * If present, a list of pathnames that should be base64
     * gzipped and uploaded to an 'uploads_inline' dict in end_command args.
     * This should be limited to relatively small files.
     */
    uploads_inline: z.string().array().nullable(),
    /**
     * If present, file paths that should be deleted on the client.
     */
    deletes: z.string().array().nullable(),
    /**
     * If present, pathnames mapped to base64 gzipped data to
     * be written to the client. This should only be used for relatively
     * small files as they are all included inline as part of the response.
     */
    downloads_inline: z.record(z.string()).nullable(),
    /**
     * If present, all empty dirs under this one should be
     * removed.
     */
    dir_prune_empty: z.string().nullable(),
    /**
     * If present, url to display to the user.
     */
    open_url: z.string().url().nullable(),
    /**
     * If present, a line of input is read and placed into
     * end_command args as 'input'. The first value is the prompt printed
     * before reading and the second is whether it should be read as a
     * password (without echoing to the terminal).
     */
    input_prompt: z.tuple([z.string(), z.boolean()]).nullable(),
    /**
     * If present, a message that should be printed after all other
     * response processing is done.
     */
    end_message: z.string().nullable(),
    /**
     * end arg for end_message print() call.
     */
    end_message_end: z.string(),
    /**
     * If present, this command is run with these args at the end
     * of response processing.
     */
    end_command: z.tuple([z.string(), z.record(z.unknown())]).nullable(),
});

const APPLICATION_STATE = {
    login_token: null,
};
const TimeZoneOffset = new Date().getTimezoneOffset() * -60;
const handleResponse = (res) => {
    console.log(res);
};
const sendCommand = async (command, payload) => {
    const requestData = {
        c: command,
        t: APPLICATION_STATE.login_token,
        p: payload,
        z: TimeZoneOffset,
        y: false,
    };
    const rawResponse = await fetch('https://ballistica.net/bacloudcmd', {
        method: 'POST',
        headers: {
            'User-Agent': `bacloud-community/${API_VERSION}`,
            'Accept-Encoding': 'gzip, deflate',
            Accept: '*/*',
            Connection: 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            v: API_VERSION.toString(),
            r: JSON.stringify(requestData),
        }),
    });
    const response = ResponseSchema.parse(await rawResponse.json());
    handleResponse(response);
};

await sendCommand('user', { a: ['status'] });
