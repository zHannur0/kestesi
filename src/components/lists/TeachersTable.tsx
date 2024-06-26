import {FC, useEffect, useState} from "react";
import { Teachers } from "@/types/assets.type";
import TeachersCard from "@/components/cards/TeachersCard";
import Keyboard from "@/components/Keyboard";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";
import {en} from "@/locales/en";

interface TeachersTableProps {
  handleChooseTeacher?: any;
  teachers?: Teachers[];
}


const TeachersTable: FC<TeachersTableProps> = ({
  handleChooseTeacher,
  teachers,
}) => {
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
    en: en,
  };
  const t = translations[router.locale || "kz"] || en;
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
        className={`px-[50px] py-[30px] bg-white rounded-[40px] max-sm:rounded-[20px] flex flex-col items-start gap-5 w-[100%] max-h-[910px] max-sm:p-[20px] vr:max-h-[1600px]`}
      >
        <div className={"flex flex-wrap gap-[10px] w-[100%]"}>
          <div onClick={() => setInputValue("all")}
              className={"flex justify-center items-center border-2 rounded-[20px] max-sm:rounded-[10px] text-2xl max-sm:text-lg max-sm:leading-[30px] font-bold leading-normal cursor-pointer vr:text-[40px]"}
               style={{
                 backgroundColor: inputValue === "all" ? "#ED008C" : "white",
                 color: inputValue === "all" ? "white" : "#211F23",
                 border: "3px solid transparent",
                 backgroundImage: inputValue === "all" ? "none" : "linear-gradient(white, white), linear-gradient(to right, #5D49A0, #E9028E)",
                 backgroundOrigin: 'border-box',
                 backgroundClip: inputValue === "all" ? 'padding-box' : 'content-box, border-box',
               }}
          >
            <p className={`px-[35px] py-[14px] max-sm:px-[16px] max-sm:py-[10px]`}>{t.teachers.all}</p>
          </div>
          {
            filterValues.sort((a,b) => a.localeCompare(b)).map((item, index) => (
                <div key={index}
                     className={"max-sm:w-[50px] max-sm:h-[50px] max-sm:text-lg flex justify-center items-center rounded-[20px] max-sm:rounded-[10px] text-2xl font-bold leading-normal cursor-pointer vr:text-[40px]"}
                     style={{
                       background: inputValue === item ? "#ED008C" : "transparent",
                       color: inputValue === item ? "white" : "#211F23",
                       border: "3px solid transparent",
                       backgroundImage: inputValue === item ? "none" : "linear-gradient(white, white), linear-gradient(to right, #5D49A0, #E9028E)",
                       backgroundOrigin: 'border-box',
                       backgroundClip: inputValue === item ? 'padding-box' : 'content-box, border-box',
                     }}
                     onClick={() => setInputValue(item)}
                >
                  <p className={`px-[35px] py-[14px] max-sm:px-[16px] max-sm:py-[10px]`}>{item}</p>
                </div>

            ))
          }
        </div>
        <div className={`flex flex-wrap gap-[30px] h-[100%] overflow-auto scrollbar-hide rounded-[20px] w-full max-sm:gap-[10px]`}>
          {teachers ? (
              teachers
                  .filter(
                      (user) => {
                        if (inputValue === "all") {
                          return true;
                        }
                        return user.full_name && user.full_name.toLowerCase().startsWith(inputValue.toLowerCase());
                      }
                  ).sort((a, b) => {
                const nameA = a.full_name || "";
                const nameB = b.full_name || "";

                return nameA.localeCompare(nameB);
              })
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
