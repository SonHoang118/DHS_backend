const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const cloudinary = require('./utils/Cloudinary');
const fileUpload = require('express-fileupload')
const jwt = require('jsonwebtoken');

const postController = require('./controllers/postController');
const projectController = require('./controllers/projectController');
const styleController = require('./controllers/styleController');
const webInfoController = require('./controllers/webInfoController');

const app = express();

app.use(fileUpload())

const port = process.env.PORT || 3002;

app.use(express.static('public')); // phục vụ file tĩnh
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors())

const adminMiddleware = async (req, res, next) => {
    const token = req.headers.token
    try {
        if (token) {
            const access_token = token.split(" ")[1]
            jwt.verify(access_token, 'secret_key', (err, user) => {
                if (err) {
                    return res.status(200).json({
                        result: 'ERR',
                        mes: "Token is not valid"
                    })
                }
                if (!user.isAdmin) {
                    return res.status(200).json({
                        result: 'ERR',
                        mes: "You can not to do that"
                    })
                }
                // ALL is right --> next
                next()
            })
        }
        else {
            return res.status(200).json({
                result: 'ERR',
                mes: "Can not get token"
            })
        }
    }
    catch (err) {
        return res.status(200).json({
            result: 'ERR',
            mes: "Something wrong (authMiddleware)",
            Error: err
        })
    }
}


app.get('/getAllPosts', postController.getAllPosts);
app.post('/createPost', adminMiddleware, postController.createPost);
app.put('/update-post/:id', adminMiddleware, postController.updatePost);
app.delete('/deletePost/:id', adminMiddleware, postController.deletePost);
app.get('/getDetailPost/:id', postController.getDetailPost);

app.get('/getAllProject', projectController.getAllProjects);
app.post('/createProject', adminMiddleware, projectController.createProject);
app.put('/update-project/:id', adminMiddleware, projectController.updateProject)
app.delete('/deleteProject/:id', adminMiddleware, projectController.deleteProject);
app.get('/getDetailProject/:id', projectController.getDetailProject);

app.post('/create-new-type-product', adminMiddleware,styleController.createTypeProduct)


////////////////////////
app.get('/get-detail-type-product/:id', styleController.getDetailTypeProduct)
app.get('/get-detail-type-product-name/:name', styleController.getDetailTypeProductName)
////////////////////

app.get('/get-all-type-product/', styleController.getAllDetailTypeProduct)
app.post('/get-many-detail-type-product/', styleController.getManyDetailTypeProduct)
app.put('/update-type-product/:id', adminMiddleware,styleController.updateTypeProduct)
app.delete('/delete-type-product/:id', adminMiddleware,styleController.deleteTypeProduct)

app.get('/get-all-type-product-name/', styleController.getAllTypeProductName)

app.patch('/update-add-products/', adminMiddleware,styleController.updateAddProducts)
app.patch('/update-delete-products/', adminMiddleware,styleController.updateDeleteProducts)

app.get('/getWebInfo', webInfoController.getWebInfo);
app.put('/update-web-infor/:id', adminMiddleware,webInfoController.updateProject)

// app.post('/create', webInfoController.createProject);



// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         const form = new FormData();
//         form.append('source', fs.createReadStream(req.file.path));

//         const response = await axios.post('https://upanh.tv/api/1/upload', form, {
//             headers: {
//                 ...form.getHeaders(),
//                 'X-API-Key': 'chv_Us_449780b120a5ea3c6e79039829bdccda12ee697c99d7694511a713c1e19a01fc7e92648ba0ecb087a473becd5c017ccb9d72c7f815770190f819327eec2d7da9'
//             },
//             timeout: 10000,
//             family: 4 // Chỉ dùng IPv4 nếu IPv6 gây lỗi
//         });

//         // Xoá file tạm sau khi upload thành công
//         fs.unlinkSync(req.file.path);

//         res.json(response.data);
//     } catch (err) {
//         console.error('Upload failed:', err.message);
//         res.status(500).json({ error: 'Upload failed' });
//     }
// });

// app.post('/upload', (req, res) => {
// 	if (!req.files) {
// 		return res.status(400).send('No files were uploaded.')
// 	}

// 	let sampleFile = req.files.sampleFile
// 	let uploadPath = __dirname + '/uploads/' + sampleFile.name

// 	sampleFile.mv(uploadPath, function (err) {
// 		if (err) {
// 			return res.status(500).send(err)
// 		}

// 		imgur.uploadFile(uploadPath).then((urlObject) => {
// 			fs.unlinkSync(uploadPath)
// 			res.render('uploaded.ejs', { link: urlObject.link })
// 		})
// 	})
// })

// app.post('/upload', (req, res) => {
//     if (!req.files || !req.files.sampleFile) {
//         return res.status(400).json({ error: 'No files were uploaded.' });
//     }

//     const sampleFile = req.files.sampleFile;
//     const uploadPath = __dirname + '/uploads/' + sampleFile.name;

//     sampleFile.mv(uploadPath, function (err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         console.log(typeof imgur.uploadFile); // phải ra: 'function'
//         imgur.uploadFile(uploadPath)
//             .then((urlObject) => {
//                 fs.unlinkSync(uploadPath); // xóa ảnh tạm
//                 console.log(urlObject.link);
//                 res.json({ link: urlObject.link }); // 🔁 Trả về JSON cho client
//             })
//             .catch((error) => {
//                 res.status(500).json({ error: error.message });
//             });
//     });
// });
// cloudinary.js



// const ACCESS_TOKEN = '5b234885239a31f9d9ed7967c9c5ab1142a17713'; // bạn thay token vào đây
// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         fs.unlinkSync(req.file.path); // Xóa file local sau khi upload

//         res.json({ url: result.secure_url });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.delete('/delete-image/:publicId', adminMiddleware, async (req, res) => {
//     const { publicId } = req.params;

//     try {
//         console.log(publicId);
//         const result = await cloudinary.uploader.destroy(publicId);
//         if (result.result === 'ok' || result.result === 'not found') {
//             return res.status(200).json({ success: true, message: 'Image deleted successfully' });
//         } else {
//             return res.status(500).json({ success: false, message: 'Failed to delete image', result });
//         }
//     } catch (err) {
//         console.error('Error deleting image:', err);
//         return res.status(500).json({ success: false, message: 'Server error' });
//     }
// });




app.delete('/delete-images', adminMiddleware, async (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ status: false, message: 'Invalid or empty ids array' });
    }

    try {
        const deletePromises = ids.map(id => cloudinary.uploader.destroy(id));
        await Promise.all(deletePromises);

        return res.json({ status: true, message: 'Deleted images successfully' });
    } catch (err) {
        console.error('Error deleting multiple images:', err);
        return res.status(500).json({ status: false, message: 'Failed to delete some or all images' });
    }
});





app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // kiểm tra thông tin người dùng (giả sử đúng)
    if (username === 'admin' && password === '123') {
        const token = jwt.sign({ isAdmin: true }, 'secret_key', { expiresIn: '1h' });

        // redirect sang frontend với token
        return res.status(200).json({
            status: 200,
            result: 'OKK',
            token
        })
    } else {
        return res.status(200).json({
            status: 400,
            result: 'Error'
        })
    }
});


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connect database success');
    })
    .catch((err) => {
        console.log(err);
    })


app.listen(port, () => {
    console.log('Server is running on port:', port);
});
