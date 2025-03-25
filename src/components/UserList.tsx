"use client";
import React, { useState } from "react";
import { formatBirthDate, formatExpiracyDate } from "../utils/formatDate";
import { checkExpiration } from "@/utils/ExpiracyCheck";

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  ip: string;
  macAddress: string;
  university: string;
  bank: Bank;
  ein: string;
  ssn: string;
  userAgent: string;
  role: string;
}

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  const [userList, setUserList] = useState(users);
  const [searchInput, setSearchInput] = useState("");
  const [dropdownVisibility, setDropdownVisibility] = useState<
    Record<number, boolean>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    console.log("*************** search input :", searchValue);
    setSearchInput(searchValue);

    if (searchValue === "") {
      setUserList(users);
    } else {
      setUserList(() => {
        const filteredUsers = users.filter((user) =>
          user.firstName.toLowerCase().includes(searchValue.toLowerCase())
        );
        return filteredUsers;
      });
    }
  };

  const handleActionBtnClick = (userId: number) => {
    console.log("--------------------", typeof userId);
    setDropdownVisibility((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <div className="flex flex-col gap-y-5 py-10 px-24">
      <h1 className="text-2xl font-bold text-[var(--background-color)]">
        Users
      </h1>
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          className="bg-white text-gray-600 py-2 px-10 border-2 border-gray-200 rounded-md w-[520px] focus:outline-gray-400"
          placeholder="Search"
          onChange={handleInputChange}
        />

        <img
          src="/search.svg"
          alt="search icon"
          className="absolute left-2 top-3"
          width={22}
          height={22}
        />
      </div>

      {userList.length > 0 ? (
        <table className="rounded-xl overflow-hidden">
          <tbody>
            {userList.map((user: User) => (
              <tr className="bg-white border-b border-gray-200" key={user.id}>
                <td className="py-4 px-10 pl-5 flex gap-x-3">
                  <img
                    src={user.image}
                    className="rounded-full border-2 border-slate-100"
                    width={45}
                    height={45}
                    alt="user image"
                  />
                  <div>
                    <div className="flex items-center gap-x-2">
                      <p className="font-medium text-[17px]">
                        {user.username}{" "}
                      </p>
                      <span>
                        <img
                          src="/verifiedIcon.svg"
                          className="w-4"
                          alt="verified icon"
                        />
                      </span>
                    </div>
                    <p className="text-gray-400 font-thin text-xs">
                      @{user.firstName}
                    </p>
                  </div>
                </td>

                <td className="py-4 px-10">
                  <p className="font-medium text-[17px]">
                    {formatBirthDate(user.birthDate)}
                  </p>
                  <p className="text-gray-400 font-thin text-xs">Birthdate</p>
                </td>

                <td className="py-4 px-10">
                  <p className="font-medium text-[17px]">
                    {checkExpiration(user.bank.cardExpire)
                      ? "None"
                      : formatExpiracyDate(user.bank.cardExpire)}
                  </p>
                  <p className="text-gray-400 font-thin text-xs"> Renew Date</p>
                </td>

                <td className="py-4 px-10">
                  <p className="font-medium text-[17px]">
                    {user.bank.cardType}
                  </p>
                  <p className="text-gray-400 font-thin text-xs"> Card Type</p>
                </td>

                <td className="py-4">
                  <div
                    className="pr-5 flex justify-end items relative"
                    onClick={() => handleActionBtnClick(user.id)}
                  >
                    {dropdownVisibility[user.id] && (
                      <div className="absolute right-[48px]">
                        <button className="flex w-[100px] justify-center items-center gap-x-2 px-2 py-2 border border-gray-200 rounded-md">
                          <img
                            src={
                              checkExpiration(user.bank.cardExpire)
                                ? "./renewIcon.svg"
                                : "./cancelIcon.svg"
                            }
                            width={18}
                            height={18}
                            alt="button icon"
                          />
                          {checkExpiration(user.bank.cardExpire)
                            ? "Renew"
                            : "Cancel"}
                        </button>
                      </div>
                    )}

                    <button className="text-transparent py-2 cursor-pointer">
                      <img
                        src="/actionIcon.svg"
                        className="w-6 h-full"
                        alt="action icon"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-white px-5 py-4 rounded-md border border-gray-200">
          <p className="font-medium text-lg text-gray-600">User Not found</p>
        </div>
      )}
    </div>
  );
};
