
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Calendar, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SocialPost {
  id: string;
  name: string;
  content: string;
  image?: File;
  createdAt: Date;
  type: 'social post';
  status: 'draft' | 'scheduled' | 'published';
}

export const PostCreationModal: React.FC<PostCreationModalProps> = ({ isOpen, onClose }) => {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleCreatePost = async () => {
    if (!postText.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content to your post",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);

    try {
      // Create social post object
      const socialPost: SocialPost = {
        id: `post_${Date.now()}`,
        name: 'social post',
        content: postText.trim(),
        image: selectedImage || undefined,
        createdAt: new Date(),
        type: 'social post',
        status: 'draft'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Created social post:', socialPost);
      
      toast({
        title: "Post created successfully!",
        description: "Your social post has been saved as a draft",
      });

      // Reset form and close modal
      setPostText('');
      setSelectedImage(null);
      setImagePreview(null);
      onClose();
    } catch (error) {
      toast({
        title: "Error creating post",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleClose = () => {
    if (postText.trim() || selectedImage) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    
    setPostText('');
    setSelectedImage(null);
    setImagePreview(null);
    onClose();
  };

  const characterCount = postText.length;
  const maxCharacters = 1500;
  const isNearLimit = characterCount > maxCharacters * 0.9;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" />
              Create Social Post
            </DialogTitle>
          </DialogHeader>
          
          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Creation Section */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Post Content */}
                <div className="space-y-3">
                  <Label htmlFor="post-content" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Post Content
                  </Label>
                  <Textarea
                    id="post-content"
                    placeholder="What's happening? Share your story, updates, or announcements..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="min-h-[140px] resize-none border-2 focus:border-blue-500 transition-colors"
                    maxLength={maxCharacters}
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      💡 Tip: Include relevant keywords and hashtags for better reach
                    </span>
                    <span className={`font-medium ${isNearLimit ? 'text-red-500' : 'text-gray-500'}`}>
                      {characterCount}/{maxCharacters}
                    </span>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Image (Optional)
                  </Label>
                  
                  {!imagePreview ? (
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label 
                        htmlFor="image-upload" 
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="relative group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={removeImage}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={handleCreatePost}
                    disabled={!postText.trim() || isPublishing}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    {isPublishing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Create Social Post
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleClose}
                    disabled={isPublishing}
                    size="lg"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="w-96 border-l bg-gray-50 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-sm font-medium text-gray-700">Live Preview</h3>
                </div>
                
                <Card className="p-4 bg-white shadow-sm">
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Citation Builder Pro</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Google My Business</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>Just now</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                        Draft
                      </Badge>
                    </div>

                    {/* Post Content */}
                    {postText ? (
                      <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {postText}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 italic">
                        Your post content will appear here...
                      </div>
                    )}

                    {/* Post Image */}
                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Post preview"
                          className="w-full rounded-lg max-h-48 object-cover border"
                        />
                      </div>
                    )}

                    {/* Empty State */}
                    {!postText && !imagePreview && (
                      <div className="text-center py-8 text-gray-400">
                        <ImageIcon className="mx-auto h-12 w-12 mb-3 opacity-50" />
                        <p className="text-sm">Start typing to see your post preview</p>
                        <p className="text-xs mt-1">Add text and images to bring your post to life</p>
                      </div>
                    )}

                    {/* Engagement Preview */}
                    {(postText || imagePreview) && (
                      <div className="flex items-center justify-between pt-3 border-t text-xs text-gray-500">
                        <div className="flex gap-4">
                          <span className="hover:text-blue-600 cursor-pointer transition-colors">👍 Like</span>
                          <span className="hover:text-blue-600 cursor-pointer transition-colors">💬 Comment</span>
                          <span className="hover:text-blue-600 cursor-pointer transition-colors">📤 Share</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Social Post
                        </Badge>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Tips */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm font-medium text-blue-900">Pro Tips</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Keep posts under 1500 characters for better engagement</li>
                    <li>• Include relevant hashtags and mentions</li>
                    <li>• High-quality images get 2x more engagement</li>
                    <li>• Post during your audience's peak hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
