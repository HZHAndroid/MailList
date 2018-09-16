const networkUtil = {
    // post 请求
    post: function (url, data, callback) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
            });
    },

    // key
    key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'
};


export default networkUtil;