import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { PageProps } from '@/types';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { images } from '@/utils/images';
import AdminLayout from '@/Layouts/Division/AdminLayout';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {

    return (
        <AdminLayout
            user={auth.user}
            title='Profile'
            className='bg-primary-100 dark:bg-dark-primary-100'
        >
            <div className="flex gap-y-10 gap-x-40 max-md:flex-col-reverse">
                <div className="w-full">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail}/>

                    <UpdatePasswordForm className='mt-10'/>

                </div>
                <div className="">
                    <h2 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-5">Profile Picture</h2>
                    <div className="flex flex-col items-center gap-x-4">
                        <figure className='w-40 h-40 border border-primary-300 dark:bg-dark-primary-300 rounded-full overflow-hidden'>
                            <img className='w-full h-full' src={images('icon_avatar_default.jpg')} alt="" />
                        </figure>
                        <div className="mt-4 w-full">
                            <div className="flex gap-x-4">
                                <button className='flex-grow-[3] text-xs bg-gray-800 px-4 py-2 rounded-md text-primary-100 border border-transparent uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>Change</button>
                                <button className='flex-grow text-xs px-4 py-2 bg-transparent hover:bg-error hover:text-primary-100 border border-error text-error rounded-md uppercase tracking-widest transition ease-in-out duration-150'>Delete</button>
                            </div>

                            <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                                The maximum image size is 6 MB, and only JPG, JPEG, and PNG formats are supported.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}
