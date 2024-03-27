import Button from "@/components/ui/Button";
import { FC } from "react";

interface KeyboardProps {
  handleClick?: any;
}
const Keyboard: FC<KeyboardProps> = ({ handleClick }) => {
  return (
    <div
      className={
        "h-[360px] w-[1720px] bg-white flex flex-col justify-center gap-[5px] items-center fixed bottom-0 font-bold text-[#524FA2] text-[32px]"
      }
    >
      <div className={"flex justify-center gap-[9.05px]"}>
        {firstRow.map((item, index) => (
          <div key={index} onClick={() => handleClick(item)}>
            <Button width={66} height={80}>
              {item}
            </Button>
          </div>
        ))}
        <div onClick={() => handleClick("delete")}>
          <Button width={149} height={80}>
            Өшіру
          </Button>
        </div>
      </div>
      <div className={"flex justify-center gap-[9.05px]"}>
        {secondRow.map((item, index) => (
          <div key={index} onClick={() => handleClick(item)}>
            <Button width={66} height={80}>
              {item}
            </Button>
          </div>
        ))}
      </div>
      <div className={"flex justify-center gap-[9.05px]"}>
        {thirdRow.map((item, index) => (
          <div key={index} onClick={() => handleClick(item)}>
            <Button width={66} height={80}>
              {item}
            </Button>
          </div>
        ))}
      </div>
      <div className={"flex justify-center gap-[9.05px]"}>
        <div className={"flex justify-center gap-[9.05px]"}>
          {fourthIRow.map((item, index) => (
            <div key={index} onClick={() => handleClick(item)}>
              <Button width={66} height={80}>
                {item}
              </Button>
            </div>
          ))}
          <div onClick={() => handleClick(" ")}>
            <Button width={293} height={80}>
              {""}
            </Button>
          </div>
          {fourthIIRow.map((item, index) => (
            <div key={index} onClick={() => handleClick(item)}>
              <Button width={66} height={80}>
                {item}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const firstRow = ["Ә", "І", "Ғ", ",", ".", "Ү", "Ұ", "Қ", "Ө", "Ё"];
const secondRow = ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х"];
const thirdRow = ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"];
const fourthIRow = ["Я", "Ч", "С", "М"];
const fourthIIRow = ["И", "Т", "Ю", "Б"];

export default Keyboard;
