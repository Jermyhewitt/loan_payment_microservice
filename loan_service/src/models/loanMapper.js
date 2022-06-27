exports.reqToLoan=({id,dueDate,payment,principal}) => { 
    return {id,dueDate:new Date(dueDate).toJSON().slice(0, 19).replace('T', ' '),payment,principal};
    
}