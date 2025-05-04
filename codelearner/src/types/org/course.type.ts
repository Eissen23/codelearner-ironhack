export interface Course {
    id: number;
    name: string;
    description: string;
    short_description: string;
    fee: number;
    duration: number;
    org_id: number;
    created_at: string;
}

export interface CourseResponse {
    courses: Course[];
}
