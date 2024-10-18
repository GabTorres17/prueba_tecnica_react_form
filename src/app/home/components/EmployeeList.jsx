'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const EmployeeList = () => {

    const router = useRouter();
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            try {
                const parsedEmployees = JSON.parse(storedEmployees);
                if (Array.isArray(parsedEmployees)) {
                    setEmployees(parsedEmployees);
                } else {
                    setEmployees([parsedEmployees]);
                }
            } catch (error) {
                console.error("Error al parsear los empleados de localStorage", error);
                setEmployees([]);
            }
        }
    }, []);

    const addEmployee = (newEmployee) => {
        const employeeWithId = {
            ...newEmployee,
            id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1,
        };
        const updatedEmployees = [...employees, employeeWithId];
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    const handleDelete = (id) => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    const handleEdit = (employee) => {
        localStorage.setItem('editEmployee', JSON.stringify(employee));
        router.push('/Form');
    };

    const Button = ({ children, className = '', ...props }) => (
        <button
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
            {...props}
        >
            {children}
        </button>
    )

    const Card = ({ children, className = '', ...props }) => (
        <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`} {...props}>
            {children}
        </div>
    )

    const CardHeader = ({ children, className = '', ...props }) => (
        <div className={`px-6 py-4 ${className}`} {...props}>
            {children}
        </div>
    )

    const CardTitle = ({ children, className = '', ...props }) => (
        <h2 className={`text-xl font-semibold ${className}`} {...props}>
            {children}
        </h2>
    )

    const CardContent = ({ children, className = '', ...props }) => (
        <div className={`px-6 py-4 ${className}`} {...props}>
            {children}
        </div>
    )

    const Badge = ({ children, variant = 'default', className = '', ...props }) => {
        const variantClasses = {
            default: 'bg-gray-100 text-gray-800',
            secondary: 'bg-blue-100 text-blue-800',
        }
        return (
            <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${variantClasses[variant]} ${className}`}
                {...props}
            >
                {children}
            </span>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Empleados</h1>
            {employees.length === 0 ? (
                <div className="text-center">
                    <p className="mb-4">No existen registros de empleados.</p>
                    <Link href="/Form">
                        <Button>Crear Nuevo Empleado</Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {employees.map((employee) => (
                        <Card className="h-32" key={employee.id}>
                            <CardHeader>
                                <CardTitle className="flex justify-center text-black">
                                    {employee.name} - {employee.role}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-between">
                                <Button onClick={() => handleEdit(employee)}>Editar</Button>
                                <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(employee.id)}>Eliminar</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {employees.length > 0 && (
                <div className="mt-4">
                    <Link href="/Form">
                        <Button>Crear Nuevo Empleado</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}