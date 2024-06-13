import { FC, useState, useEffect } from "react";

interface IProps {
    slides: string[]; // предполагаем, что slides - это массив URL изображений
    time?: number;
}

const Slider: FC<IProps> = ({ slides,time }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            goToNext();
        }, time);

        return () => clearInterval(intervalId); // Очищаем интервал, когда компонент будет размонтирован
    }, [currentIndex, slides.length]); // Зависимости useEffect, чтобы перезапустить интервал при изменении currentIndex или количества слайдов

    return (
        <div className="relative w-[100%] h-[100%] rounded-[40px] max-sm:rounded-0 vr:rounded-0">
            <img src={slides[currentIndex]} alt="" className={"rounded-[40px] max-sm:rounded-[0px] w-[100%] h-[100%] vr:rounded-0"}/>
            <div className={"absolute bottom-4 flex justify-center items-center w-[100%]"}>
                <div className="flex justify-center">
                    {slides.length > 1 && slides.map((slide, slideIndex) => (
                        <div
                            className="cursor-pointer"
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                        >
                            {
                                slide === slides[currentIndex] ? (
                                    <img src="/images/stick.svg" alt="" className={"w-[20px] "}/>
                                ) : (
                                    <img src="/images/sliderEllipse.svg" alt="" className={"w-[10px] h-[10px]"}/>
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;
