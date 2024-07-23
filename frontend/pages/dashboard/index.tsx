import { useEffect, useState } from 'react';
import Head from 'next/head';
import SidePanel from '@/components/common/SidePanel';
import CreateTask from '@/components/common/CreateTask';
import Tasks from '@/components/common/Tasks';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';



function Dashboard() {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const [activeCategory, setActiveCategory] = useState<string>('all');

    return (
        <div className="flex h-screen bg-gray-100">
            <Head>
                <title>Task Management Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SidePanel
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-950">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                        <CreateTask editMode={false} />
                    </div>
                    <span className="flex items-center">
                        <span className="h-px flex-1 bg-gray-800"></span>
                    </span>
                </div>
                <Tasks selectedCategory={activeCategory} />
            </main>

        </div>
    );
}

export default Dashboard;