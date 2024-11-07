"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { DataContact } from '../Models/contact.model';
import Contact from '../Service/ContacSer';
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';

const Page: React.FC = () => {
    const [contacts, setContacts] = useState<DataContact[]>([]);
    const [loading, setLoading] = useState(false);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await Contact.fetchAll();
            setContacts(result);
        } catch (error) {
            console.error("Une erreur s'est produite lors du chargement des données :", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div>
            <div className="overflow-x-auto">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold py-10 text-2xl">Next.js 14 CRUD Create, Read, Update and Delete - MongoDB Daisyui TailwindCSS</h1>
                </div>
                <div className="text-right">
                    <Link className="btn btn-primary" href={"/addProduct"}>
                        Add Product
                    </Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((rs) => (
                            <tr className="hover" key={rs._id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12"></div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{rs.Nom}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    ${rs.Prenom}
                                </td>
                                <td>{rs.Numero}</td>
                                <th>
                                    <Link href={`/editProduct/${rs._id}`}>
                                        <button className="btn btn-primary">Edit</button>
                                    </Link>
                                    <RemoveBtn _id={rs._id} />
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
