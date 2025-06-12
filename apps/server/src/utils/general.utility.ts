import {
  AdditionalSort,
  QueryParams,
  SortDirection,
} from '@server/types/general.types';
import { PipelineStage } from 'mongoose';

export class GeneralUtility {
  private static instance: GeneralUtility;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  static getInstance(): GeneralUtility {
    if (!GeneralUtility.instance) {
      GeneralUtility.instance = new GeneralUtility();
    }
    return GeneralUtility.instance;
  }

  public parseReqBody(obj: Record<string, any>): Record<string, any> {
    Object.keys(obj).forEach((key) => {
      let value = obj[key];

      // Check if value is a stringified array or object
      if (
        typeof value === 'string' &&
        ((value.startsWith('[') && value.endsWith(']')) ||
          (value.startsWith('{') && value.endsWith('}')))
      ) {
        try {
          // Attempt to parse the string as JSON
          value = JSON.parse(value);
          obj[key] = value;
          return; // Return early if successfully parsed
        } catch (e) {
          // If JSON parsing fails, leave the value as-is
        }
      }

      if (typeof value === 'string') {
        // Convert specific string values to their appropriate types
        if (value === 'null') {
          obj[key] = null;
        } else if (value === 'true') {
          obj[key] = true;
        } else if (value === 'false') {
          obj[key] = false;
        } else if (/^\d+(\.\d+)?$/.test(value.trim())) {
          obj[key] = Number(value); // Convert numeric strings to numbers
        }
      }
    });

    return obj;
  }

  public generateAggregationPipeline(
    queryParams: QueryParams,
    query: PipelineStage[],
    sortOn = 'createdAt',
    additionalSortOn: AdditionalSort = {},
  ): PipelineStage[] {
    let pipeline: PipelineStage[] = query;

    const skip =
      ((parseInt(queryParams?.page || '1', 10) || 1) - 1) *
      (parseInt(queryParams?.limit || '0', 10) || 0);

    const dataPipeline: PipelineStage.FacetPipelineStage[] = [
      {
        $sort: {
          [sortOn]: parseInt(queryParams?.sort || '-1', 10) as SortDirection,
          ...additionalSortOn,
        },
      },
      { $skip: skip },
    ];

    if (queryParams?.limit) {
      dataPipeline.push({ $limit: parseInt(queryParams.limit, 10) });
    }

    pipeline = pipeline.concat([
      {
        $facet: {
          data: dataPipeline,
          totalCount: [{ $count: 'count' }],
        },
      },
      {
        $addFields: {
          totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
        },
      },
    ] as PipelineStage[]);

    return pipeline;
  }

  public generateOtpWithExpiry(expiryTime: number = 5 * 60 * 1000): {
    otp: string;
    expiry: number;
  } {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + expiryTime;
    return { otp, expiry };
  }
}

export const generalUtility = GeneralUtility.getInstance();
