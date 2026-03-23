import { useState, useEffect, useCallback } from 'react';
import { validatePolicyLink } from '../components/LinkValidator';
import type { Policy } from '../types';

interface PolicyValidationState {
  policyId: string;
  status: 'valid' | 'invalid' | 'checking' | 'pending';
  message?: string;
}

// 后台静默校验政策链接
export function usePolicyLinkValidation(policies: Policy[]) {
  const [validationStates, setValidationStates] = useState<Map<string, PolicyValidationState>>(new Map());
  const [isValidating, setIsValidating] = useState(false);
  const [progress, setProgress] = useState(0);

  // 校验单个政策链接
  const validateSinglePolicy = useCallback(async (policy: Policy) => {
    setValidationStates((prev) => {
      const newMap = new Map(prev);
      newMap.set(policy.id, { policyId: policy.id, status: 'checking' });
      return newMap;
    });

    const result = await validatePolicyLink(policy.sourceUrl);

    setValidationStates((prev) => {
      const newMap = new Map(prev);
      newMap.set(policy.id, {
        policyId: policy.id,
        status: result.status,
        message: result.message,
      });
      return newMap;
    });

    return result;
  }, []);

  // 批量校验所有政策链接
  const validateAllPolicies = useCallback(async () => {
    setIsValidating(true);
    setProgress(0);

    const results = [];
    for (let i = 0; i < policies.length; i++) {
      const result = await validateSinglePolicy(policies[i]);
      results.push(result);
      setProgress(((i + 1) / policies.length) * 100);
    }

    setIsValidating(false);
    return results;
  }, [policies, validateSinglePolicy]);

  // 组件挂载时自动开始校验
  useEffect(() => {
    if (policies.length > 0) {
      validateAllPolicies();
    }
  }, [policies, validateAllPolicies]);

  // 获取校验统计
  const stats = {
    total: policies.length,
    valid: Array.from(validationStates.values()).filter((s) => s.status === 'valid').length,
    invalid: Array.from(validationStates.values()).filter((s) => s.status === 'invalid').length,
    checking: Array.from(validationStates.values()).filter((s) => s.status === 'checking').length,
    pending: Array.from(validationStates.values()).filter((s) => s.status === 'pending').length,
  };

  return {
    validationStates,
    isValidating,
    progress,
    stats,
    validateSinglePolicy,
    validateAllPolicies,
  };
}
