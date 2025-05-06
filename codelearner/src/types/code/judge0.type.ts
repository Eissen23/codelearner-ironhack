export type SubmissionParams = {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  signal?: AbortSignal;
  wait?: boolean;
};

export type SubmissionResponse = {
  stdout: string;
  time: number;
  memory: number;
  stderr: string | null;
  token: string;
  compile_output: string | null;
  message: string;
  status: {
    id: number;
    description: string;
  };
};
/* {
	"stdout": "hello\n",
	"time": "0.865",
	"memory": 48160,
	"stderr": null,
	"token": "49efc352-3916-477f-80df-15a01d30726a",
	"compile_output": null,
	"message": null,
	"status": {
		"id": 3,
		"description": "Accepted"
	}
} */
