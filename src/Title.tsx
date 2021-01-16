import * as React from "react";

export default function Title() {
  return (
    <div>
      <div className="flex my-4">
        <svg
          className="inline w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h4 className="inline text-2xl font-bold my-0 mx-4">Opening hours</h4>
      </div>
      <hr />
    </div>
  );
}
