#上传、下载文件以及进度条的展示

## Sample
    ```js
    const instance = new File({
        selector: "#file",
        url: "http://3000/file/upload"
    })
    document.getElementById("upload").addEventListener('click', function () {
        instance.uploadFile(() => {
            
        })
    })
    ```
## 开发计划
【✔️】上传文件及进度条及上传的文件详情（完成）
【✔️】下载文件及进度条及下载为文件详情（未完成）    
【✔️】开源封装（未完成）    