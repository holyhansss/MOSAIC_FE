import axios from "axios";

const dummy = async () => {
    let response;
    const saveProduct = async () => {
        // e.preventDefault();
        await axios.get('http://localhost:3000/products',{
            response: response
        });
        history.push("/");
        console.log(response);
    }
    saveProduct();
}

// const dummy = async () => {
//     let response;
//     await axios.get('http://localhost:5000/products',{
//         res: response
//     });
//     console.log(response);
// }
dummy();