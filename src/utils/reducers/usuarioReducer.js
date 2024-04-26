export const usuarioReducer = (state = [], action) => {
    switch (action.type) {
        case 'addFlujoTrabajo':
            
            return state?.length ? [
                ...state,
                {
                    ...action.payload,
                }
            ] : [action.payload]
        case 'removeFlujoTrabajo':
            return state?.length && state.filter(flujoTrabajo => flujoTrabajo.id !== action.payload);
        case 'updateFlujoTrabajo':
            return state?.length && state.map(u => {
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return u;
            })
        case 'loadingFlujosTrabajos':
            return action.payload;
        default:
            return state;
    }
}