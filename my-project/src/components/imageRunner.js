import axios from "axios";
const imageRunner = async (path) => {
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;
    const url = `${ip}:${port}/getbase64`;
    const formPath = {
        path,
    };
    const response = await new Promise((resolve, reject) => {
        axios.post(url, formPath).then(
            res => {
                resolve(res.data);
            }
        );
    })
    const base64 = `data:image/png;base64,${response}`
    return base64;
};
export default imageRunner