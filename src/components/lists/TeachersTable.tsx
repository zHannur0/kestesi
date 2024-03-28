import {FC, useEffect, useState} from "react";
import { Teachers } from "@/types/assets.type";
import TeachersCard from "@/components/cards/TeachersCard";
import Keyboard from "@/components/Keyboard";

interface TeachersTableProps {
  handleChooseTeacher?: any;
  teachers?: Teachers[];
}


const TeachersTable: FC<TeachersTableProps> = ({
  handleChooseTeacher,
  teachers,
}) => {
  const [isFocused, setIsFocused] = useState(true);
  const [inputValue, setInputValue] = useState<string>("all");
  const [filterValues, setFilterValues] = useState<string[] >([]);
  const handleOnFocus = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if(teachers) {
      let set:Set<string> = new Set();
      teachers.forEach((item) => {
        set.add(item.full_name?.charAt(0) || "");
      });
      setFilterValues(Array.from(set));
    }
  }, [teachers]);

  const handleClose = () => {
    setIsFocused(true);
    setInputValue("");
  };
  const handleClick = (letter?: string) => {
    let inputTemp = "";
    if (letter === " ") {
      inputTemp = inputValue + " ";
    } else if (letter === "delete") {
      if (inputValue) inputTemp = inputValue.slice(0, -1);
    } else {
      inputTemp = inputValue + "" + letter;
    }
    setInputValue(inputTemp);
  };
  const handleInputChange = (e?: any) => {
    const searchTerm = e.target.value;
    setInputValue(searchTerm.toUpperCase());
  };

  return (
    <>
      <div
        className={`px-[50px] py-[30px] bg-white rounded-[40px] flex flex-col items-start gap-5 w-[100%] max-h-[910px]`}
      >
        <div className={"flex gap-[10px]"}>
          <div onClick={() => setInputValue("all")}
              className={"px-[35px] py-[14px] flex justify-center items-center border-2 rounded-[20px] text-2xl font-bold leading-normal cursor-pointer"}
               style={{
                 backgroundColor: inputValue === "all" ? "#ED008C" : "white",
                 color: inputValue === "all" ? "white" : "#211F23",
                 borderColor: inputValue === "all" ? "#ED008C" : "#5D49A0",
               }}
          >
            Все
          </div>
          {
            filterValues.map((item, index) => (
                <div key={index}
                    className={"w-[60px] h-[65px] flex justify-center items-center border-2 rounded-[20px] text-2xl font-bold leading-normal cursor-pointer"}
                    style={{
                      backgroundColor: inputValue === item ? "#ED008C" : "white",
                      color: inputValue === item ? "white" : "#211F23",
                      borderColor: inputValue === item ? "#ED008C" : "#5D49A0",
                    }}
                     onClick={() => setInputValue(item)}
                >
                  {item}
                </div>
            ))
          }
        </div>
        <div className={`flex flex-wrap gap-[30px] h-[100%] overflow-auto scrollbar-hide rounded-[20px] `}>
          {teachers ? (
              teachers
                  .filter(
                      (user) => {
                        if (inputValue === "all") {
                          return true;
                        }
                        return user.full_name && user.full_name.toLowerCase().startsWith(inputValue.toLowerCase());
                      }
                  )
                  .map((item, index) => (
                      <TeachersCard
                          key={index}
                  img={item.photo3x4}
                  fullname={item.full_name}
                  job={item.subject}
                  id={item.id}
                  handleChooseTeacher={handleChooseTeacher}
                />
              ))
          ) : (
            <div>Преподавателей нет</div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeachersTable;
