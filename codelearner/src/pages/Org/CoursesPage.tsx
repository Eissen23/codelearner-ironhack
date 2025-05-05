import CourseList from "../../features/main/course/CourseList";
import FilterBar from "../../features/main/filter/FilterBar";
import LayoutHome from "../../layout/LayoutHome";

const CoursePage = () => {
  return (
    <LayoutHome>
      <FilterBar />
      <CourseList />
    </LayoutHome>
  );
};

export default CoursePage;
