import {FC, useState} from "react";
import {Teachers} from "@/types/assets.type";
import TeachersCard from "@/components/cards/TeachersCard";
import Keyboard from "@/components/Keyboard";


interface TeachersTableProps {
    handleChooseTeacher?: any,
    teachers?:Teachers[],
}

const TeachersTable: FC<TeachersTableProps> = ({handleChooseTeacher, teachers}) => {
    const [isFocused, setIsFocused] = useState(true);
    const [inputValue, setInputValue] = useState<string>("");
    const handleOnFocus = () => {
        setIsFocused(false);
    };

    const handleClose = () => {
        setIsFocused(true);
        setInputValue("");
    };
    const handleClick = (letter?: string ) => {
        let inputTemp= "";
        if(letter === " ") {
            inputTemp = inputValue + " ";
        }else if(letter === "delete") {
            if(inputValue)
            inputTemp = inputValue.slice(0,-1);
        }else {
            inputTemp = inputValue + "" + letter;
        }
        setInputValue(inputTemp);
    }
    const handleInputChange = (e?:any) => {
        const searchTerm = e.target.value;
        setInputValue(searchTerm.toUpperCase())
    }


    return(
        <>
        <div className={`px-[50px] pt-[30px] bg-white rounded-[40px] flex-col justify-end items-start gap-5 inline-flex min-w-full`}>
            <div
                className={`w-[100%] h-[66px] px-5 rounded-[20px] border-2 border-purple-800 justify-start items-center inline-flex`}>
                {isFocused ? <img src="/images/searchIcon.svg" alt=""/> : <img src="/images/searchIconFocus.svg" alt=""/>}
                <input value={inputValue} onChange={handleInputChange} onFocus={handleOnFocus} type="text" className="w-full text-2xl border-none outline-0 border-b-2"/>
                {!isFocused && <img src="/images/x.svg" className={"w-10 h-10 hover:cursor-pointer"} alt="" onClick={handleClose} />}
            </div>
            <div className={`flex flex-wrap gap-[30px]`}>
                {
                    teachers ?
                    teachers.filter((user) =>
                        user.full_name && user.full_name.toLowerCase().startsWith(inputValue.toLowerCase())
                    ).map((item, index) => (
                            <TeachersCard key={index} img={item.photo3x4} fullname={item.full_name} job={item.subject} id={item.id} handleChooseTeacher={handleChooseTeacher} />
                        )) : <div>Преподавателей нет</div>
                }
            </div>
        </div>
        {!isFocused && <Keyboard handleClick={handleClick}/>}
        </>

    )
}

export default TeachersTable;