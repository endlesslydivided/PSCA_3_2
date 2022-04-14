let validator = (params) => 
{
    if (!Array.isArray(params)) 
    {
        throw new Error('Параметры представлены не в виде массива');
    }
    if (params.length < 2) 
    {
        throw new Error('Необходимо два и более параметра');
    }
    params.forEach(p => 
    {
        if (!isFinite(p)) 
        {
            throw new Error('В качестве параметра передано не число');
        }
    });

    return params;
};

let divValidator = (params) => 
{
    if (!Array.isArray(params)) 
    {
        throw new Error('Параметры представлены не в виде массива');
    }
    if (params.length < 2) 
    {
        throw new Error('Необходимо два и более параметра');
    }
    params.forEach(p => 
    {
        if (!isFinite(p)) 
        {
            throw new Error('В качестве параметра передано не число');
        }
    });
    if (params[1] === 0) 
    {
        throw new Error('Деление на ноль');
    }

    return params;
};

module.exports=
{
    validator,
    divValidator
}