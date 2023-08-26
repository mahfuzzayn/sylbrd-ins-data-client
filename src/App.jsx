import React from "react";
import { useQuery } from "react-query";
import "./App.css";

const fetchCollegeData = async (key, collegeId) => {
    const response = await fetch(
        `https://sylbrd-tc-ins-data.vercel.app/${collegeId}`
    );
    return response.json();
};

const App = () => {
    const collegeId = window.location.pathname.replace("/", ""); // Extract collegeId
    const {
        data: collegeData,
        isLoading,
        isError,
    } = useQuery(
        ["collegeData", collegeId], // Use collegeId as part of the query key
        () => fetchCollegeData("collegeData", collegeId) // Pass collegeId to
    );

    if (isLoading) {
        return (
            <div className="loading-interface flex justify-center mx-5">
                <img
                    src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
                    className="w-full max-w-xl"
                    alt=""
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="error-interface flex justify-center mt-10 m-4">
                <div className="container flex flex-col gap-y-3">
                    <h3 className="text-2xl font-semibold text-center pb-3 px-3">
                        Error fetching data.
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <main>
            <div className="interface flex justify-center mt-10 m-4">
                <div className="container flex flex-col gap-y-3">
                    <h3 className="text-xl font-semibold text-center pb-3 px-3 border-b-2 border-blue-300 mb-4">
                        Sylhet Board TC College Information 2023
                    </h3>
                    <h2 className="text-xl font-semibold">
                        Seats:{" "}
                        {!!collegeData.availableSeats && (
                            <span
                                className={`${
                                    parseInt(
                                        collegeData.availableSeats.split("=")[1]
                                    ) > 0
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                } px-1 py-0.5 rounded-md text-white`}
                            >
                                {collegeData.availableSeats}
                            </span>
                        )}
                    </h2>
                    <h2 className="text-md font-semibold">
                        ID: {collegeData.id}
                    </h2>
                    <h2 className="text-md font-semibold">
                        College: {collegeData.collegeName}
                    </h2>
                    <h2 className="text-md font-semibold">
                        Version: {collegeData.version}
                    </h2>
                    <h2 className="text-md font-semibold">
                        Shift: {collegeData.shift}
                    </h2>
                    <h2 className="text-md font-semibold">
                        Group: {collegeData.group}
                    </h2>
                    <h2 className="text-md font-semibold">
                        Gender: {collegeData.gender}
                    </h2>
                    <h2 className="text-md font-semibold">
                        Minimum GPA: {collegeData.minimumGPA}
                    </h2>
                    <h2 className="text-md font-semibold">
                        Available Subjects: {collegeData.availableSubjects}
                    </h2>
                    <h2 className="text-xl font-semibold">
                        Available Seats:{" "}
                        {collegeData.availableSeats && (
                            <span
                                className={`${
                                    parseInt(
                                        collegeData.availableSeats.split("=")[1]
                                    ) > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                } p-1 rounded-md`}
                            >
                                {collegeData.availableSeats.split("=")[1]}
                            </span>
                        )}
                    </h2>
                    {collegeData.id && (
                        <a
                            href="http://application.sylhetboard.gov.bd/index.php/tc/index"
                            target="_blank"
                            className={`${
                                parseInt(
                                    collegeData.availableSeats.split("=")[1]
                                ) > 0
                                    ? "inline-block bg-blue-500 text-white"
                                    : "hidden"
                            } px-4 py-2 rounded-lg font-medium text-center mt-5`}
                        >
                            Apply for TC Now
                        </a>
                    )}
                    <h3 className="text-lg font-medium mt-5">
                        Important Links 👇{" "}
                    </h3>
                    <a
                        href="https://sylhetboard.gov.bd/"
                        target="_blank"
                        className="text-blue-500"
                    >
                        sylhetboard.gov.bd
                    </a>
                </div>
            </div>
            <footer>
                <div className="bg-blue-100 mt-40 px-4 py-4 text-center">
                    <p>
                        Developed by{" "}
                        <a
                            href="https://github.com/mahfuzzayn"
                            target="_blank"
                            className="font-medium text-blue-500"
                        >
                            Mahfuz Zayn
                        </a>{" "}
                        💙
                    </p>
                </div>
            </footer>
        </main>
    );
};

export default App;
