/*========Product========*/
import { closeModal } from "./views/modal";
import { handleGetProductLocalStorage, setInLocalStorage } from "./persistence/localStorage";
import { handleGetProductsToStore } from "./views/store";
import { handleRenderList } from "./views/store";
import { productoActivo } from "../../main";
import Swal from "sweetalert2";

//GUARDAR
const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click",()=>{
    handleSaveOrModifyElements();
});
//FUNCION GUARDAR
const handleSaveOrModifyElements = ()=>{
    const nombre = document.getElementById("nombre").value,
    imagen = document.getElementById("img").value,
    precio = document.getElementById("precio").value,
    categories = document.getElementById("categoria").value;
    let object = null;
    
    if(productoActivo){
        object = {
            ... productoActivo,
            nombre,
            imagen,
            precio,
            categories,
        }; 
    }else{
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories,  
        };
    }
    Swal.fire({
        title: "Correcto!",
        text: "Producto guardado correctamente!",
        icon: "success"
      });
    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();
    
};
//ELIMINAR ELEMENTO
export const handleDeleteProduct = ()=>{
    Swal.fire({
        title: "¿Desea eliminar elemento",
        text: "Si lo eliminas sera permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
            //Setear el nuevo array
            localStorage.setItem("products", JSON.stringify(result)); 
            const newproduct = handleGetProductLocalStorage(); 
            handleRenderList(newproduct);
            closeModal();
        } else {
            closeModal();
        }
      });
};