import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import GlobalApi from './../../../../../services/GlobalApi';

function PersonalDetails({ enabledNext }) {
  const params = useParams();
  const navigate = useNavigate(); // Correct navigation setup
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
  }, []);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { data: formData };

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data.data);
      enabledNext(true);
      setLoading(false);
      toast('Details Updated');
    } catch (error) {
      setLoading(false);
    }
  };

  // ✅ Updated: Navigate to the Summary section instead of Education
  const goToNextSection = () => {
    navigate(`/edit-resume/${params.resumeId}/Summary`); // Ensure this route exists
  };

  return (
    <div className="p-8 shadow-xl bg-gray-900 text-white rounded-xl border border-gray-800 gap-5 mt-10 transform transition-all hover:scale-[1.02]">
      <h2 className="font-extrabold text-2xl text-gray-100">Personal Details</h2>
      <p className="text-gray-400">Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-6">
          <div>
            <label className="text-gray-300 text-sm">First Name</label>
            <Input name="firstName" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Last Name</label>
            <Input name="lastName" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
          </div>
        </div>

        <div className="mt-5">
          <label className="text-gray-300 text-sm">Job Title</label>
          <Input name="jobTitle" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
        </div>

        <div className="mt-5">
          <label className="text-gray-300 text-sm">Address</label>
          <Input name="address" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
        </div>

        <div className="grid grid-cols-2 mt-5 gap-6">
          <div>
            <label className="text-gray-300 text-sm">Phone</label>
            <Input name="phone" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
          </div>
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <Input name="email" required onChange={handleInputChange} className="bg-gray-800 text-white border-gray-700" />
          </div>
        </div>

        {/* ✅ Next Button now navigates to Summary */}
        <div className="mt-6 flex justify-between">
          <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 font-semibold rounded-lg">
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
          <Button type="button" onClick={goToNextSection} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-semibold rounded-lg">
            Next →
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
