import { Request, Response } from 'express';

import { supabase } from '../config/supabase.js';

export const getDashboardStats = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [
      machinesResult,
      activeMachinesResult,
      featuredMachinesResult,
      inquiriesResult,
      newInquiriesResult,
      contactedInquiriesResult,
      closedInquiriesResult
    ] = await Promise.all([
      supabase
        .from('machines')
        .select('id', { count: 'exact', head: true }),

      supabase
        .from('machines')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true),

      supabase
        .from('machines')
        .select('id', { count: 'exact', head: true })
        .eq('featured', true),

      supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true }),

      supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new'),

      supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'contacted'),

      supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'closed')
    ]);

    const results = [
      machinesResult,
      activeMachinesResult,
      featuredMachinesResult,
      inquiriesResult,
      newInquiriesResult,
      contactedInquiriesResult,
      closedInquiriesResult
    ];

    const failedQuery = results.find((result) => result.error);

    if (failedQuery?.error) {
      console.error(
        'Failed to fetch dashboard statistics:',
        failedQuery.error
      );

      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard statistics'
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: {
        machines: {
          total: machinesResult.count ?? 0,
          active: activeMachinesResult.count ?? 0,
          featured: featuredMachinesResult.count ?? 0
        },
        inquiries: {
          total: inquiriesResult.count ?? 0,
          new: newInquiriesResult.count ?? 0,
          contacted: contactedInquiriesResult.count ?? 0,
          closed: closedInquiriesResult.count ?? 0
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};