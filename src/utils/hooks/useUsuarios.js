import { useContext, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { usuarioReducer } from "../reducers/usuarioReducer";
import { findAll, findById,findByToken, findByRadicado, save, update } from "../services/flujoTrabajoService";


const initialFlujosTrabajos = [];

export const useFlujosTrabajos = () => {
    const [usuarios, dispatch] = useReducer(usuarioReducer, initialFlujosTrabajos);
    
    const getFlujosTrabajos = async () => {
        try {            
            const result = await findAll();
            //console.log(result);
            dispatch({
                type: 'loadingFlujosTrabajos',
                payload: result.data,
            });
        } catch (error) {
            if (error.response?.status == 401 || 
                error.response?.status == 403) {
                //handlerLogout();
            }
        }
    }

    const getUsuarios = async (id) => {

        const result = await findById(id);
        try {            
            //console.log(result);
            dispatch({
                type: 'loadingFlujosTrabajos',
                payload: result.data,
            });
        } catch (error) {
            if (error.response?.status == 401 || 
                error.response?.status == 403) {
                //handlerLogout();
            }
        }
        return result.data
    }

    const updateUsuario = async (id) => {
        const token = localStorage.getItem("token")
        const result = await findByToken(token);
        try {            
            //console.log(result);
            dispatch({
                type: 'loadingFlujosTrabajos',
                payload: result.data,
            });
        } catch (error) {
            if (error.response?.status == 401 || 
                error.response?.status == 403) {
                //handlerLogout();
            }
        }
        return result.data
    }

    return {
        getUsuarios,
        usuarios
    }
}
