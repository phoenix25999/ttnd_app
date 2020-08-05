export const isAdmin = ( userRole ) => {
    if(userRole==='ADMIN'){
        return true;
    }

    else{
        return false;
    }
}

export const isSuperAdmin = ( userRole ) => {
    if(userRole==='SUPERADMIN'){
        return true;
    }
    
    else{
        return false;
    }
}