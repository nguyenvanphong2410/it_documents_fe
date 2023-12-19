import axios from "axios";
import "./editPost.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { publicRequest, userRequest } from "../../requestMethods";
import { FileUploader } from "react-drag-drop-files";
import { SvgDelete } from "../../components/svgs/SvgDelete";
import Spinner from "../../components/spinner/Spinner";
import { useLocation } from "react-router-dom";

const EditPost = () => {
  useEffect(() => {
    document.title = "Chỉnh sửa phòng";
  }, []);
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [post, setPost] = useState([]);
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photosDelete, setPhotosDelete] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [thumbs, setThumbs] = useState([]);
  const { user } = useContext(Context);
  const [year, setYear] = useState("");
  // Upload Pdf
  const [file, setFile] = useState(null);
  // console.log(used);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //new add
  useEffect(() => {
    const getPost = async () => {
      const res = await publicRequest.get(`/post/details/${path}`);
      document.title = `${res.data?.name}`;
      setPost(res.data);
      setName(res.data?.name);
      setPhotos(res.data?.photos);
      setDesc(res.data?.desc);
      setYear(res.data?.year);
      setCategory(res.data?.category);
    };
    getPost();
  }, [path]);

  // console.log(base64);
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "jfif"];

  // CKEditor
  const editorConfiguration = {
    mediaEmbed: { previewsInData: true },
  };

  useEffect(() => {
    const getCats = async () => {
      const res = await publicRequest.get("/category/all");
      // console.log(res.data);
      setCategories(res.data.data.categories);
    };
    getCats();
  }, []);

  // blob images selected
  const handleFiles = (e) => {
    setFiles([...files, ...e]);
    const blob = [...e].map((file) => URL.createObjectURL(file));
    setThumbs([...thumbs, ...blob]);
  };

  // delete selected image
  const handleDeleteSelectedImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setThumbs(thumbs.filter((_, i) => i !== index));
    URL.revokeObjectURL(thumbs[index]);
  };

  // delete photos
  const handleDeletePhotos = (img) => {
    setPhotos(photos.filter((photo) => photo !== img));
    // setPhotosDelete((prev) => prev.concat(photos.filter((photo) => photo === img)))
    setPhotosDelete([
      ...photosDelete,
      ...photos.filter((photo) => photo === img),
    ]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    if (files) {
      try {
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "folder_posts");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dp5a2zjnz/image/upload",
              data
            );
            const { secure_url, public_id } = uploadRes.data;
            // newPost.photo = secure_url;
            return {
              src: secure_url,
              public_id: public_id,
            };
          })
        );
        console.log([...photos, ...list]);

        try {
          // newPost.photos = list;
          const formData = new FormData();
          formData.append("file", file);
          const newPost = {
            username: user.username,
            name,
            desc,
            category,
            year,
            photos: [...photos, ...list],
            photosDelete,
          };
          console.log(newPost);
          formData.append("newPost", JSON.stringify(newPost));
          // await userRequest.put(`/posts/${post._id}`, newPost);
          await userRequest.put(`/post/${post._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setIsUploading(false);
          navigate(user?.isAdmin ? '/documents': '/');
        } catch (err) {
          setError(true);
          setIsUploading(false);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="write">
      <div className="write__wrapper">
        <form className="write__form" onSubmit={handleUpdate}>
          <div className="write__formGroup">
            <div className="write__formWrapper">
              Thêm Hình Ảnh
              <div className="write__imageWrapper">
                {thumbs &&
                  thumbs.map((thumb, index) => (
                    <figure key={index} className="write__thumb">
                      <img src={thumb} alt="" />
                      <span
                        className="write__iconDelete"
                        onClick={() => handleDeleteSelectedImage(index)}
                      >
                        <SvgDelete color="#d63232" />
                      </span>
                    </figure>
                  ))}
              </div>
              <FileUploader
                id="fileInput"
                classes="drop_area"
                type="file"
                label="Tải lên hoặc thả tệp ngay tại đây"
                name="file"
                multiple
                hoverTitle="Thả ở đây"
                types={fileTypes}
                handleChange={(e) => handleFiles(e)}
              />
              {photos && (
                <>
                  {photos.map((img, index) => {
                    return (
                      <figure key={index} className="singlePost__image">
                        <img src={img.src} alt={"alt"} />

                        <span
                          className="singlePost__iconDelete"
                          style={{ width: "40px", height: "40px" }}
                          onClick={() => handleDeletePhotos(img)}
                        >
                          <SvgDelete color="#d63232" />
                        </span>
                      </figure>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          <div className="write__formGroup" style={{ marginBottom: "24px" }}>
            <input
              type="text"
              className="write__input"
              placeholder="Tên tài liệu"
              autoFocus={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              className="write__input"
              style={{ fontSize: "16px" }}
              placeholder="Năm xuất bản"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <div className="pdfFileWrapper">
              <label className="pdfFile" htmlFor="pdfFile">
                Tải lên tệp PDF <span>+</span>
              </label>
              <span style={{ color: "#46c046" }}>{file?.name}</span>
              <input
                id="pdfFile"
                type="file"
                className="form-control"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option style={{ display: "none" }}>Thể loại</option>
              {categories &&
                categories.map((category) => (
                  <option key={category._id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="write__formGroup">
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              className="write__textarea"
              data={desc}
              onChange={(event, editor) => {
                setDesc(editor.getData());
                // console.log( { event, editor, data } );
              }}
            />
          </div>
          <button className="write__submit" type="submit">
            {isUploading ? <Spinner color="white" /> : "Cập nhật"}
          </button>
          {error && (
            <div style={{ color: "red" }}>Vui lòng đổi tiêu đề khác</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditPost;
