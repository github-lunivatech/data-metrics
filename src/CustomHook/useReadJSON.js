import { useEffect, useState } from "react";
// import '../../public/appSettings.json'

const useReadJSON = (filename, filepath='public') => {
    const [responseFile, setReponseFile] = useState('');

    useEffect(() => {
        fetch(`../../${filepath}/${filename}`)
            .then((response) => response.json())
            .then((json) => {
                setReponseFile(json);
            });
    }, [])

    return responseFile
}

export default useReadJSON