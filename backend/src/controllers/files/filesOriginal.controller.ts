import {
    removeFilesByType,
    removeProjectById,
    findFilesByType,
    bulkCreateOriginals,
} from "../../services/subtitle.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";

const postUpload = catchAsync(async (req, res, next) => {
    const files = req.body;
    if (!files) {
        return next(new AppError("No files selected", 400));
    }
    await bulkCreateOriginals(files);
    res.status(201).json({ message: "success file upload " });
});

const getOriginalFiles = catchAsync(async (req, res, next) => {
    const filesSubtitle = await findFilesByType("original");
    if (!filesSubtitle) {
        return next(new AppError("Not found files", 404));
    }
    res.status(200).json({ message: "Found all files", filesSubtitle });
});

const deleteOriginalFiles = catchAsync(async (req, res, next) => {
    const deletedAllFiles = await removeFilesByType("original");
    if (!deletedAllFiles) {
        return next(new AppError( "Files not found or already deleted" ,404));
    }
    res.status(204).json({ message: "All files delete successfully" });
});

const deleteFileId = catchAsync(async (req, res, next) => {
        const deletedFile = await removeProjectById(req.params.id as string);
        if (!deletedFile) {
            return next(new AppError("File not found or already deleted", 404));
        }

        res.status(204).json({ message: "Success delete file" });

});

export { postUpload, getOriginalFiles, deleteOriginalFiles, deleteFileId };
