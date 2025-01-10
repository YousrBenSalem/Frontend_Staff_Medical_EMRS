/* eslint-disable react/prop-types */
import { FaDownload } from "react-icons/fa";

function FileCard({ fileUrl, fileType }) {
  return (
    <div className="relative group w-40 h-40 p-4 border rounded-lg shadow-lg overflow-hidden">
      {/* Afficher image ou fichier */}
      {fileType === "image" ? (
        <img src={fileUrl} alt="File" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span>{fileUrl.split("/").pop()}</span>
        </div>
      )}

      
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a href={fileUrl} download>
          <FaDownload className="text-white text-3xl" />
        </a>
      </div>
    </div>
  );
}

export default FileCard;
