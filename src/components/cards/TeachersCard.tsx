import { FC } from "react";

interface TeachersCardProps {
  id?: number;
  img?: string;
  fullname?: string;
  job?: string;
  handleChooseTeacher?: any;
}

const TeachersCard: FC<TeachersCardProps> = ({
  id,
  img,
  fullname,
  job,
  handleChooseTeacher,
}) => {
  return (
    <div
      onClick={() => handleChooseTeacher(id)}
      className={`flex py-[20px] w-[520px] h-[200px] px-[30px] gap-[20px] rounded-[30px] bg-[#F8F8FB] items-center max-sm:w-full max-sm:h-auto`}
    >
      <div className={`w-40 h-40 rounded-[100%] max-sm:w-[120px] max-sm:h-[120px] bg-no-repeat bg-center bg-cover`}
           style={{
             backgroundImage: `url("${img || "/images/user.svg"}")`
           }}>
      </div>
      <div >
        <div className={`flex text-2xl font-bold leading-normal text-[#524FA2] max-sm:text-[18px]`}>
          {fullname}
        </div>
        <div className={`flex text-[#211F23] text-2xl font-normal leading-[34.40px] max-sm:text-[14px] max-sm:leading-none`}>
          {job !== "Null" && job}
        </div>
      </div>
    </div>
  );
};

export default TeachersCard;
