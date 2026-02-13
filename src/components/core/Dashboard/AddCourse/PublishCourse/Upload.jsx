import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud, FiX } from "react-icons/fi"
import { useSelector } from "react-redux"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name])

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-vd-secondary">
        {label} <sup className="text-red-500">*</sup>
      </label>

      <div
        {...getRootProps()}
        className={`relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group
          ${isDragActive ? "border-orange-500 bg-orange-50" : "border-orange-200 hover:border-orange-300 bg-orange-50/50"}
          ${previewSource ? "min-h-[200px]" : "min-h-[180px]"}
        `}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="relative w-full h-full">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={previewSource}
                controls
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Overlay with Remove Button */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 bg-white rounded-lg shadow-lg flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <FiX />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiUploadCloud className="text-3xl text-orange-500" />
            </div>
            <p className="text-sm text-vd-muted mb-2">
              Drag & drop {video ? "video" : "image"} here or <span className="font-semibold text-orange-500">browse</span>
            </p>
            <p className="text-xs text-vd-muted">
              {video ? "MP4 (Max 100MB)" : "JPG, PNG (16:9 ratio)"}
            </p>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span> {label} is required
        </span>
      )}
    </div>
  )
}