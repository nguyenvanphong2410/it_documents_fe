import axios from "axios";
import "./write.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { publicRequest, userRequest } from "../../requestMethods";
import { FileUploader } from "react-drag-drop-files";
import { SvgDelete } from "../../components/svgs/SvgDelete";
import Spinner from "../../components/spinner/Spinner";

const Write = () => {
  useEffect(() => {
    document.title = "Tạo tài liệu";
  }, []);

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [thumbs, setThumbs] = useState([]);
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  // console.log(base64);
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "jfif"];

  // Upload Pdf
  const [file, setFile] = useState(null);
  console.log(file);

  // CKEditor
  const editorConfiguration = {
    mediaEmbed: { previewsInData: true },
  };

  useEffect(() => {
    const getCats = async () => {
      const res = await publicRequest.get("/category/all");
      console.log(res.data.data.categories);
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

  const handleSubmit = async (e) => {
    setIsUploading(true);
    e.preventDefault();

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
        // console.log(list);
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
            photos: list,
          };
          console.log(newPost);
          formData.append("newPost", JSON.stringify(newPost));
          await userRequest.post("/post", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          // await userRequest.post("/posts", newPost);
          setIsUploading(true);
          thumbs.map((thumb) => URL.revokeObjectURL(thumb));
          // navigate("/room/" + res.data.name);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="write">
      <div className="write__wrapper">
        <form className="write__form" onSubmit={handleSubmit}>
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
            </div>
          </div>
          <div className="write__formGroup" style={{ marginBottom: "24px" }}>
            <input
              type="text"
              className="write__input"
              placeholder="Tên tài liệu"
              autoFocus={true}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              className="write__input"
              style={{ fontSize: "16px" }}
              placeholder="Năm xuất bản"
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
                required
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
              onChange={(event, editor) => {
                setDesc(editor.getData());
                // console.log( { event, editor, data } );
              }}
            />
          </div>

          <button className="write__submit" type="submit">
            {isUploading ? <Spinner color="white" /> : "Tạo tài liệu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
