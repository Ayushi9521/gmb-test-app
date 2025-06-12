
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, EyeOff, Upload, User, Settings, Clock, Monitor, Camera, LoaderCircle, Lock,LoaderCircleIcon } from 'lucide-react';
import { getProfile, updateProfile } from '@/services/profileService';
import { Link } from 'react-router-dom';
import { getAllTimeZone } from '@/services/timeZone';


const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateDataLoading, setIsUpdateDataLoading] = useState(false)
  const [timezones, setTimezones] = useState<{ [key: string]: string }>({});



  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    username: '',
    timeZone: '',
    planExpDate: '',
    dashboardType: 0,
    language: '',
    profilePic: '',
    planName: '',
    password: '',
  });
  type ProfileData = {
    first_name: string;
    last_name: string;
    username: string;
    timeZone: string;
    planExpDate: string;
    dashboardType: number;
    language: string;
    profilePic: string;
    planName: string;
    password: string;
  };
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {

        const data = await getProfile();
        setProfileData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          username: data.username || '',
          timeZone: data.timezone || '',
          planExpDate: data.planExpDate || '',
          dashboardType: Number(data.dashboardType) || 0,
          language: data.language || 'english',
          profilePic: data.profilePic || '',
          planName: data.planName || '',
          password: data.password || '',
        });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error('Failed to fetch profile:', err);
      }
    };

    const getTimeZone = async () => {
      const data = await getAllTimeZone();
      console.log(data);

      setTimezones(data);

    }
    fetchProfile();
    getTimeZone();

  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectBoxChanges = (name: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setProfileData((prev) => ({
        ...prev,
        profilePic: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAll = async () => {
    try {

       setIsUpdateDataLoading(true);
      const updatedData = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        timezone: profileData.timeZone,
        dashboardType: profileData.dashboardType,
        profilePic: profileData.profilePic,
        password: profileData.password,
        language:profileData.language,
        username:profileData.username,
        // Add other fields if needed
      };
      const res = await updateProfile(updatedData);
      toast({
        title: "Success",
        description: res.data.message,
        variant: "default", //default or "destructive"
      });
       setIsUpdateDataLoading(false);

    } catch (err) {
      console.error('Profile update failed:', err);
      alert('Update failed');
       setIsUpdateDataLoading(false);
    }
  };

  if (isLoading) {
    return <div className='h-100 w-100' style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><LoaderCircle className="animate-spin" /></div>
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="bg-grey-600 hover:bg-grey-700 px-12 py-3 text-lg mb-4" style={{ marginBottom: 10 }}>
          Back
        </Link>

        {/* Profile Header */}
        <Card className="overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-4 border-white">
                <AvatarImage src={profileData.profilePic} />
                <AvatarFallback className="bg-white text-blue-600 text-xl font-semibold">
                  {profileData.first_name[0]}{profileData.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{profileData.first_name} {profileData.last_name}</h2>
                <p className="text-blue-100">{profileData.email}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span>Plan: {profileData.planName}</span>
                  <span>Plan Expiry: {profileData.planExpDate}</span>
                  <span className="bg-green-500 px-2 py-1 rounded text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information Card */}
          <Card className="h-fit lg:h-[700px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last name *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="username"
                  name="username"
                  type="email"
                  value={profileData.username}
                  onChange={handleChange}
                  
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Language</Label>
                <Select
                  value={profileData.language}
                  onValueChange={(value) => selectBoxChanges('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="dutch">Dutch</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Profile Picture Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-gray-600" />
                  <Label className="text-base font-medium">Profile Picture</Label>
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                  <Avatar className="h-16 w-16 border-2 border-gray-200">
                    <AvatarImage src={profileData.profilePic || '/placeholder.svg'} />
                    <AvatarFallback className="text-lg font-semibold">
                      {profileData.first_name?.[0] || ''}
                      {profileData.last_name?.[0] || ''}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mb-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload new picture
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500">
                      At least 800x800 px recommended. JPG or PNG allowed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card className="h-fit lg:h-[700px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Settings className="h-5 w-5 text-blue-600" />
                Preferences & Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 flex-1">
              {/* Time Zone Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <Label className="text-base font-medium">Time Zone</Label>
                </div>
                <Select value={profileData.timeZone} name="timeZone" onValueChange={(value) => selectBoxChanges('timeZone', value)}>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones && Object.entries(timezones).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dashboard Type Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-gray-600" />
                  <Label className="text-base font-medium">Dashboard Type</Label>
                </div>
                <RadioGroup
                  value={String(profileData.dashboardType)}
                  onValueChange={(value) => {
                    handleChange({
                      target: { name: "dashboardType", value: Number(value) },
                    }
                    )
                    console.log("Updated dashboardType:", Number(value));
                  }
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="0" id="singleListing" />
                    <div className="flex-1">
                      <Label htmlFor="singleListing" className="font-medium cursor-pointer">Single Listing Dashboard</Label>
                      <p className="text-sm text-gray-500">Simple layout with essential metrics</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="1" id="multiListing" />
                    <div className="flex-1">
                      <Label htmlFor="multiListing" className="font-medium cursor-pointer">Multi Listing Dashboard</Label>
                      <p className="text-sm text-gray-500">Comprehensive view with detailed analytics</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Change Password  */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-600" />
                  <Label className="text-base font-medium">Change Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  placeholder='Enter Password'
                  value={profileData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">plan Exp Date</Label>
                <Input
                  id="last_name"
                  name="planExpDate"
                  value={profileData.planExpDate}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Single Save Button for All Changes */}
        <div className="flex justify-center mt-8">
          <Button onClick={handleSaveAll} 
          className="bg-blue-600 hover:bg-blue-700 px-12 py-3 text-lg"
           disabled={isUpdateDataLoading}
           >
            {isUpdateDataLoading ? (<span className="flex items-center gap-2"><LoaderCircle className="animate-spin" /> Updating...</span>) : 'Update Profile' }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
