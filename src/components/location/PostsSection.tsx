
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, AlertTriangle, Plus } from 'lucide-react';
import { PostCreationModal } from './PostCreationModal';

interface PostsSectionProps {
  posts: {
    live: number;
    scheduled: number;
    failed: number;
  };
}

export const PostsSection: React.FC<PostsSectionProps> = ({ posts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPosts = posts.live + posts.scheduled + posts.failed;
  
  const postTypes = [
    {
      label: 'Live Posts',
      value: posts.live,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      label: 'Scheduled',
      value: posts.scheduled,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'Failed',
      value: posts.failed,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      badgeColor: 'bg-red-100 text-red-800'
    }
  ];

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Post Overview</h3>
          <Badge variant="outline" className="text-xs">
            {totalPosts} total
          </Badge>
        </div>

        <div className="space-y-4 mb-6">
          {postTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${type.bgColor}`}>
                    <Icon className={`w-4 h-4 ${type.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{type.label}</p>
                    <p className="text-xs text-gray-500">
                      {type.label === 'Failed' && type.value > 0 ? 'Needs attention' : 'All good'}
                    </p>
                  </div>
                </div>
                <Badge className={type.badgeColor}>
                  {type.value}
                </Badge>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <Button className="w-full" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            Manage Posts
          </Button>
        </div>
      </Card>

      <PostCreationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
