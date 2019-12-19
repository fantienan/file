class File {
    constructor(options = {}) {
        this.defaultOptions = {
            url: "",
            method: "POST",
            selector: ""
        }
        this.options = {
            ...this.defaultOptions,
            ...options
        }
    }
    validate() {
        const {selector} = this.options
        if (Object.prototype.toString.call(selector) !== "[object String]") {
            console.error("selector It's not a selector")
            return false
        }
        var node = document.querySelector(selector)
        if (!node) {
            console.error("HTML doesn't exist")
            return false
        }
        return true
    }
    fileSelected() {
        if(!this.validate()) {
            return
        }
        const file = document.querySelector(selector).files[0]
        if (file) {
            const fileSize = 0;
            if (file.size > 1024 * 1024) {
                fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            } else {
                fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            }
            return {
                name: file.name,
                size: fileSize,
                Type: file.Type,
                file
            }   
        }
    }
    uploadFile(callback = () => {}) {
        if(!this.validate()) {
            return
        }
        const node = document.querySelector(this.options.selector)
        const _this = this
        var fd = new FormData();
        fd.append("file", node.files[0]);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (e) {
            _this.uploadProgress(e, callback)
        }, false);
        xhr.addEventListener("load", function (e) {
            _this.uploadComplete(e, callback)
        }, false);
        xhr.addEventListener("error", function (e) {
            _this.uploadFailed(e, callback)
        }, false);
        xhr.addEventListener("abort", function (e) {
            _this.uploadCanceled(e, callback)
        }, false);
        xhr.open("POST", _this.options.url);
        xhr.send(fd);
    }

    uploadProgress(event, callback) {
        if (evt.lengthComputable) {
            callback({event})
        } else {
            callback({
                event,
                error: 'unable to compute'
            })
        }
    }
    uploadComplete(event, callback) {
        callback({event})
    }
    uploadFailed(event, callback) {
        callback({
            event,
            error: "There was an error attempting to upload the file."
        })
    }
    uploadCanceled(event, callback) {
        callback({
            event,
            error: "The upload has been canceled by the user or the browser dropped the connection."
        })
    }
}