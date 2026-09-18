import { useInView } from "react-intersection-observer";
import { ProjectType } from "../../types/projectType";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

type AllProjectPropsType = {
  projects: ProjectType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isSearching: boolean;
  isLoading?: boolean;
};

// true => Done
// false => Not Done

function AllProject({
  projects,
  hasNextPage,
  fetchNextPage,
  isSearching,
  isLoading,
}: AllProjectPropsType) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (projects.length === 0) {
    return <div>No Projects Found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-notoSans">
      {projects.map((project: ProjectType) => {
        return (
          <Link
            key={project._id}
            className={`${
              project.status === false ? "bg-base-200" : "bg-accent"
            } min-h-60   p-5 shadow-md rounded-md`}
            to={`/project/$projectCode`}
            params={{
              projectCode: project.projectCode ? project.projectCode : "",
            }}
          >
            <div className="flex  justify-between text-lg md:text-xl mb-0">
              <h3 className="font-lexend font-bold ">{project.name}</h3>
              <div
                className={
                  project.status === true
                    ? "bg-success text-success-content  py-1 px-2 rounded"
                    : ""
                }
              >
                {project.status === true ? "Done" : ""}
              </div>
            </div>

            <div className="divider my-0"></div>
            <p className="text-lg ">
              <span className="font-bold text-base-content">
                Project Code:{" "}
              </span>
              {project.projectCode}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Client Name: </span>
              {project.clientName}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">
                Client Phone:{" "}
              </span>
              {project.clientPhone}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Budget: </span>
              {project.budget}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Advance: </span>
              {project.advance}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Due: </span>
              {project.due}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Deadline: </span>
              {project.endDate}
            </p>
          </Link>
        );
      })}

      {hasNextPage && !isSearching && <div ref={ref}>Loading...</div>}
    </div>
  );
}

export default AllProject;
