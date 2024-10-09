"use client";

import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import Button from '../../shared/Button';

interface LoginFormValues {
    name: string;
}

interface LoginPopupProps {
    onSubmit?: (data: LoginFormValues) => void;
}

const LoginPopup = ({ onSubmit }: LoginPopupProps) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormValues>({
        mode: 'onChange', // Для активации isValid при изменении
    });

    const onSubmitForm = (data: LoginFormValues) => {
        // Сохраняем имя в куки
        Cookies.set('playerName', data.name, { expires: 7 }); // Куки будет жить 7 дней
        if (onSubmit) {
            onSubmit(data);
        }
    };

    return (
        <div className="w-full flex flex-col space-y-4 mt-0">
            <h2 className="text-lg font-semibold text-center text-[var(--header-text-color)] uppercase h-10">
                Please provide your name
            </h2>
            <form onSubmit={handleSubmit(onSubmitForm)} className="w-full space-y-4">
                <input
                    {...register("name", {
                        required: "Name is required",
                        minLength: { value: 3, message: "Name must be at least 3 characters" },
                        maxLength: { value: 12, message: "Name must be no more than 12 characters" }
                    })}
                    placeholder="Name"
                    className="w-full p-[20px] border border-gray-300 rounded-full text-[var(--text-color)] h-10 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all duration-300"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <Button label="Join" onClick={handleSubmit(onSubmitForm)} disabled={!isValid} />
            </form>
        </div>
    );
};

export default LoginPopup;
