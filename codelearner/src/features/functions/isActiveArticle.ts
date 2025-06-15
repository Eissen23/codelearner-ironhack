import { useParams } from "react-router";

export function isActiveArticle (id: string) {
    const {article_id} = useParams();
    if (article_id === id)
        return true;
}

export function isActiveSubArticle (id: string) {
    const {sub_article_id} = useParams();
    if (sub_article_id === id)
        return true;
}