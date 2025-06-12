
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock, CheckCircle } from 'lucide-react';

interface QASectionProps {
  qaData: {
    answered: number;
    pending: number;
  };
}

export const QASection: React.FC<QASectionProps> = ({ qaData }) => {
  const total = qaData.answered + qaData.pending;
  const responseRate = total > 0 ? Math.round((qaData.answered / total) * 100) : 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Questions & Answers</h3>
        <Badge variant="outline" className="text-xs">
          {responseRate}% response rate
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Answered</p>
              <p className="text-xs text-gray-500">Questions responded to</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            {qaData.answered}
          </Badge>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-yellow-100">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Pending</p>
              <p className="text-xs text-gray-500">Awaiting response</p>
            </div>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800">
            {qaData.pending}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        {qaData.pending > 0 && (
          <Button className="w-full" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Answer Pending Questions
          </Button>
        )}
        <Button variant="outline" className="w-full" size="sm">
          View All Q&A
        </Button>
      </div>
    </Card>
  );
};
