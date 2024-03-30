const formatDate = (inputDate) => {
    const parts = inputDate.split('/');
    const day = parts[1].padStart(2, '0');
    const month = parts[0].padStart(2, '0');
    const formattedDate = `${day}.${month}.${parts[2]}`;
    return formattedDate;
}

export default formatDate;